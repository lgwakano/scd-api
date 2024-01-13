#!/bin/bash

# Check if the Docker container exists
if docker inspect a-postgres-db &> /dev/null; then
  # Check if the Docker container is running
  if [ "$(docker inspect -f '{{.State.Running}}' a-postgres-db)" = "true" ]; then
    echo 'Container a-postgres-db is already running.'
  else
    # Start the Docker container if it's stopped
    echo 'Container a-postgres-db is stopped. Starting...'
    if docker start a-postgres-db; then
      echo 'Container started successfully.'
    else
      echo 'Error starting container. Exiting...'
      exit 1
    fi
  fi
else
  # Create the Docker container
  echo 'Container a-postgres-db does not exist. Creating...'
  if docker run --name a-postgres-db -p 5432:5432 --env-file .env -d postgres; then
    echo 'Container created successfully.'
  else
    echo 'Error creating container. Exiting...'
    exit 1
  fi
fi

# Check if the Event table exists in the database
if docker exec a-postgres-db psql -U postgres -d "${POSTGRES_DB_NAME}" -tAc "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Event');" | grep -q 't'; then
  echo 'Data already exists. Skipping seed script.'
else
  # Run Prisma migrations
  if npx prisma db push; then
    echo 'Prisma migrations applied successfully.'
  else
    echo 'Error applying Prisma migrations. Exiting...'
    exit 1
  fi

  # Run seed script
  if npm run seed; then
    echo 'Seed script executed successfully.'
  else
    echo 'Error executing seed script. Exiting...'
    exit 1
  fi
fi

# Wait for key press before exiting
read -n 1 -s -r -p "Press any key to exit..."