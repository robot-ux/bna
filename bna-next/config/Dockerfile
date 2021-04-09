ARG AWS_ACCOUNT

FROM node:14 as builder

WORKDIR /opt/app

COPY . .
ENV NODE_ENV production
RUN yarn --frozen-lockfile
RUN yarn build

FROM ${AWS_ACCOUNT}.dkr.ecr.ap-northeast-1.amazonaws.com/amazonlinux:latest

WORKDIR /opt/app
ARG STATIC_BUCKET
ARG STATIC_BUCKET_CN
ARG AWS_ROLE
ARG AWS_ROLE_SESSION_NAME
ARG COSCMD_SECRET_ID
ARG COSCMD_SECRET_KEY
COPY --from=builder /opt/app /opt/app
RUN export LC_CTYPE=en_US.UTF-8 \
  &&  export temp_role=$(aws sts assume-role --role-arn ${AWS_ROLE} --role-session-name ${AWS_ROLE_SESSION_NAME}) \
  &&  export AWS_ACCESS_KEY_ID=$(echo $temp_role | jq .Credentials.AccessKeyId | xargs) \
  &&  export AWS_SECRET_ACCESS_KEY=$(echo $temp_role | jq .Credentials.SecretAccessKey | xargs) \
  &&  export AWS_SESSION_TOKEN=$(echo $temp_role | jq .Credentials.SessionToken | xargs) \
  &&  aws sts get-caller-identity \
  &&  aws s3 cp /opt/app/.next/static s3://${STATIC_BUCKET}/_next/static --recursive --cache-control "private, max-age=259200" \
  &&  aws s3 cp /opt/app/public s3://${STATIC_BUCKET}/static --recursive --cache-control "private, max-age=259200"
RUN export LC_CTYPE=en_US.UTF-8 \
  &&  coscmd config -a ${COSCMD_SECRET_ID} -s ${COSCMD_SECRET_KEY} -b ${STATIC_BUCKET_CN} -r ap-shanghai\
  &&  coscmd -b ${STATIC_BUCKET_CN} -r ap-shanghai upload -r /opt/app/public /static \
  &&  coscmd -b ${STATIC_BUCKET_CN} -r ap-shanghai upload -r /opt/app/.next/static /_next/static

FROM node:14

RUN mkdir /mnt/efs

WORKDIR /opt/app
COPY --from=builder /opt/app/.next .next
COPY --from=builder /opt/app/node_modules node_modules
COPY --from=builder /opt/app/package.json package.json
COPY --from=builder /opt/app/yarn.lock yarn.lock

EXPOSE 3000

CMD [ "yarn", "--silent", "start-docker" ]
