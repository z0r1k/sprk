Match filter
---

**Running application**

To run application:

    docker-compose up --build

Then:

    http://localhost:8000

_It could be that Mongo is not ready by the time Node is trying to connect so it will exit with code 1 but dockerd will restart it because of the restart policy in `docker-compose` so on the second attempt connection should be successful._

**Running tests**

To run tests go to `app` folder and run `npm install` and once installation of node packages is complete
run `npm test`.
