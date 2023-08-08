# DevOps Project 2
Suraj Mandal
N01537188

#### Build docker images
```
docker build -t devops2_pending --build-arg STATE=PENDING .
docker build -t devops2_prod --build-arg STATE=PROD .
```

#### Add eks cluster to kubeconfig
```
aws eks --region us-west-2 update-kubeconfig --name eks1
```

#### Apply helmcharts
```
cd helm
helm install release1 . --values values.PROD.yaml
helm install release2 . --values values.PENDING.yaml
```

#### Update helmcharts
```
helm upgrade release1 . --values values.PROD.yaml
helm upgrade release2 . --values values.PENDING.yaml
```
