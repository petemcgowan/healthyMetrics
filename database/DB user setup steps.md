
docker ps      (to find your container name)

docker exec -it healthycalc-postgres-1 psql -U postgres  -d healthy   (replace container name)

Note:  It has to log into the correct database or everything will be set up in the default postgres database.  

CREATE USER healthier WITH PASSWORD 'new_password';


GRANT ALL PRIVILEGES ON DATABASE healthy TO healthier;


GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO healthier;




ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO healthier;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT USAGE, SELECT ON SEQUENCES TO healthier;




Note: To find out whether a role is a superuser or not:
  SELECT rolsuper FROM pg_roles WHERE rolname='postgres';

