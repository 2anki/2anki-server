// @generated
// This file is automatically generated by Kanel. Do not modify manually.

/** Identifier type for public.users */
export type UsersId = number & { __brand: 'UsersId' };

/** Represents the table public.users */
export default interface Users {
  id: UsersId;

  name: string;

  email: string;

  password: string;

  created_at: Date | null;

  updated_at: Date | null;

  reset_token: string | null;

  patreon: boolean | null;

  picture: string | null;
}

/** Represents the initializer for the table public.users */
export interface UsersInitializer {
  /** Default value: nextval('users_id_seq'::regclass) */
  id?: UsersId;

  name: string;

  email: string;

  password: string;

  /** Default value: CURRENT_TIMESTAMP */
  created_at?: Date | null;

  /** Default value: CURRENT_TIMESTAMP */
  updated_at?: Date | null;

  reset_token?: string | null;

  /** Default value: false */
  patreon?: boolean | null;

  /** Default value: NULL::character varying */
  picture?: string | null;
}

/** Represents the mutator for the table public.users */
export interface UsersMutator {
  id?: UsersId;

  name?: string;

  email?: string;

  password?: string;

  created_at?: Date | null;

  updated_at?: Date | null;

  reset_token?: string | null;

  patreon?: boolean | null;

  picture?: string | null;
}
