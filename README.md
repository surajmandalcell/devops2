# DevOps Project 2

```
docker build -t devops2_pending --build-arg STATE=PENDING .
docker build -t devops2_prod --build-arg STATE=PROD .
```

```
cd helm
helm install release1 devops1 --values values.PROD.yaml
helm install release2 devops2 --values values.PENDING.yaml
```