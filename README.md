```bash
docker run \
  --name jenkins-docker \
  --rm \
  --detach \
  --privileged \
  --network jenkins \
  --network-alias docker \
  --volume jenkins-data:/var/jenkins_home \
  --publish 2375:2375 \
  --publish 2376:2376 \
  --publish 8080:8080 \
  docker:dind \
  --storage-driver overlay2
```