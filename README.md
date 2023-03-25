
1. pull mysql image  (docker pull mysql )

2. create docker network
   docker network create my-network


3. build the project  ( be in the right directory)
   docker build -t home-assignment . --progress=plain -q

4.  docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=Aa12345678 -d mysql

5. create db by going inside the container (docker exec -it <container_name>
   and then going inside mysql and use "CREATE DATABASE";

6. docker run --network my-network --name home-assignment home-assignment
