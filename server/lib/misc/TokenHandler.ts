import crypto from "crypto";

import jwt from "jsonwebtoken";
import { Knex } from "knex";

import DB from "../storage/db";

interface User {
  owner: string;
  patreon?: boolean;
}

class TokenHandler {
  static SaveNotionToken(
    DB: Knex<any, unknown[]>,
    user: number,
    data: any
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      DB("notion_tokens")
        .insert({
          token_type: data.token_type,
          bot_id: data.bot_id,
          workspace_name: data.workspace_name,
          workspace_icon: data.workspace_icon,
          workspace_id: data.workspace_id,
          notion_owner: data.owner,
          token: data.access_token,
          owner: user,
        })
        .onConflict("owner")
        .merge()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static SavePatreonToken(
    DB: Knex,
    user: number,
    token: string,
    data: any
  ): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      DB("patreon_tokens")
        .insert({
          data,
          token,
          owner: user,
        })
        .onConflict("owner")
        .merge()
        .then(() => {
          resolve(true);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  static async GetNotionToken(DB: Knex, owner: number) {
    if (!owner) {
      return null;
    }
    return DB("notion_tokens").where({ owner }).returning("token").first();
  }

  static async GetPatreonToken(DB: Knex, owner: number) {
    if (!owner) {
      return null;
    }
    return DB("patreon_token").where({ owner }).returning("token").first();
  }

  static NewResetToken() {
    return crypto.randomBytes(64).toString("hex");
  }
  static NewVerificationToken(): string {
    return crypto.randomBytes(64).toString("hex");
  }
  static async IsValidResetToken(db: Knex, token: string): Promise<boolean> {
    if (!token || token.length < 128) {
      return false;
    }
    const user = await db("users").where({ reset_token: token }).first();
    /* @ts-ignore */
    return user && user.reset_token;
  }

  static async IsValidVerificationToken(
    db: Knex,
    token: string
  ): Promise<boolean> {
    if (!token || token.length < 128) {
      return false;
    }
    const user = await db("users")
      .where({
        verification_token: token,
      })
      .first();
    if (user) {
      console.debug("found user with verification token");
    } else {
      console.debug("no user with verification token");
    }
    /* @ts-ignore */
    return user && user.verification_token;
  }

  static async IsValidJWTToken(token: string): Promise<boolean> {
    if (!token) {
      return false;
    }
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET!, (error, _decodedToken) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  static async GetUserFrom(token: string): Promise<User | null> {
    const isValid = await TokenHandler.IsValidJWTToken(token);
    if (!isValid) {
      return null;
    }

    const accessToken = await DB("access_tokens")
      .where({ token })
      .returning(["owner'"])
      .first();

    if (!accessToken) {
      return null;
    }

    const user = await DB("users").where({ id: accessToken.owner }).first();
    if (!user || !user.id) {
      return null;
    }
    return { ...user, owner: user.id };
  }

  static async NewJWTToken(userId: number): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { userId },
        process.env.SECRET!,
        // { expiresIn: "1d" },
        /* @ts-ignore */
        (error, token) => {
          if (error) {
            reject(error);
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}

export default TokenHandler;
