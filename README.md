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
helm install release1 . --values values1.yaml
helm install release2 . --values values2.yaml
```

#### Update helmcharts
```
helm upgrade release1 . --values values1.yaml
helm upgrade release2 . --values values2.yaml
```

#### Delete helmcharts
```
helm uninstall release1
helm uninstall release2
```

#### Delete and Apply helmcharts
```
helm uninstall release2
helm install release2 . --values values2.yaml
```