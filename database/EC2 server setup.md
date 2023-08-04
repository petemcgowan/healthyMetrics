EC2 server setup
-----------------


ssh -i /path/to/your/key.pem ubuntu@your-ec2-public-dns

sudo apt-get update

sudo apt-get install docker.io

sudo systemctl start docker

sudo systemctl enable docker

docker --version

sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo apt-get install git

docker-compose --version

sudo apt install postgresql-client-common

sudo apt-get install postgresql-client


-----------------------------------

sudo usermod -aG docker ubuntu

log out and log back in again (of SSH client)

---------------------

set up healthy DB from backup


pg_restore --verbose -h localhost -p 5432 -U healthier -d healthy 'healthy DB Backup 04 Aug 2023.mssql'


--------------

set up ketotrain DB from backup


pg_restore --verbose -U ketotrainer -d ketotrain  'KetoLimit backup 04 Aug 2023.mssql'

pg_restore --verbose -h localhost -p 5432 -U ketotrainer -d ketotrain 'KetoLimit backup 04 Aug 2023.mssql'



