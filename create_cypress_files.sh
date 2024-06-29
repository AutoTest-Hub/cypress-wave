#!/bin/bash

# Base directory for Cypress tests
BASE_DIR="cypress/integration"

# Array of directories and their respective test files
directories=(
    "auth:user_authentication.spec.js"
    "post:post_interaction.spec.js"
    "comment:comment_interaction.spec.js"
    "voting:voting_moderation.spec.js"
    "subreddit:subreddit_interaction.spec.js"
    "profile:user_profile.spec.js"
    "notifications:notifications.spec.js"
    "search:search.spec.js"
    "messaging:messaging.spec.js"
    "misc:responsive_security.spec.js"
    "performance:performance.spec.js"
)

# Create directories and files
for entry in "${directories[@]}"; do
    dir=${entry%%:*}
    file=${entry##*:}
    mkdir -p "$BASE_DIR/$dir"
    touch "$BASE_DIR/$dir/$file"
done

echo "Directories and test files created successfully."

