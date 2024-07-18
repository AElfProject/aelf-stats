FROM cgr.dev/chainguard/wolfi-base
WORKDIR /app
RUN apk update && apk add nodejs npm git python-3 py3-pip && \
  chown -R nonroot.nonroot /app/
RUN pip install jc
COPY . ./
RUN npm install
ENTRYPOINT ["sh", "/app/start.sh"]