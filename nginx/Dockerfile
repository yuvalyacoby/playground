FROM nginx
RUN rm /etc/nginx/conf.d/default.conf

COPY nginx-selfsigned.crt /etc/nginx/ssl/nginx-selfsigned.crt
COPY nginx-selfsigned.key /etc/nginx/ssl/nginx-selfsigned.key

COPY conf /etc/nginx