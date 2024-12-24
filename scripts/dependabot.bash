#!/bin/bash

current_branch=$(git branch --show-current)

gh pr list --search "author:app/dependabot is:open status:success" --json number,headRefName --jq '.[] | "\(.number) \(.headRefName)"' | while read -r pr_number branch_name; do
  echo "Merging PR #$pr_number from branch $branch_name into $current_branch"
  git fetch origin $branch_name
  git merge --no-ff origin/$branch_name
  git push origin $current_branch
  gh pr close $pr_number --comment "Merged successfully into $current_branch."
done