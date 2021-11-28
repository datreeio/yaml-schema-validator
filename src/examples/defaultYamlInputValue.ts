export const defaultYamlInputValue = `---
apiVersion: apps/v1
kind: Service
metadata:
  name: pass-policy
  labels:
    owner: me
    environment: prod
    app: web
spec:
  containers:
    - name: nginx
      image: nginx:1.14.2
      ports:
        - containerPort: 80
`;
