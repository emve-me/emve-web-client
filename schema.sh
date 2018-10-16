# have to enter password might need .pspass secrets
docker-compose exec db pg_dump -U postgres -h db -p 5432 --no-owner --no-privileges --no-acl --schema-only shortner > test.txt