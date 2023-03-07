## The answer is: content-type: application/json; charset=utf-8

This is what appear from the include command: (curl https://jsonplaceholder.typicode.com/posts/1/comments -i)

HTTP/2 200
date: Tue, 07 Mar 2023 14:12:22 GMT
content-type: application/json; charset=utf-8
x-powered-by: Express
x-ratelimit-limit: 1000
x-ratelimit-remaining: 999
x-ratelimit-reset: 1675221201
vary: Origin, Accept-Encoding
access-control-allow-credentials: true
cache-control: max-age=43200
pragma: no-cache
expires: -1
x-content-type-options: nosniff
etag: W/"5e6-4bSPS5tq8F8ZDeFJULWh6upjp7U"
via: 1.1 vegur
cf-cache-status: HIT
age: 17651
server-timing: cf-q-config;dur=4.9999999873762e-06
report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v3?s=mvqejbqOcVFpFLS5FiZwPoN6TnC3zl0lHW9ffdzvltSnUf4jgJ4k07kRkFyyfAtovmiLL77xW5aI%2F17q2fEcq2BDBJLtuQkvt5xs%2BwVhHQP5YhOZSyKjrp9jboGptpr%2BMCZJCcfzA2iWINazJZ8D"}],"group":"cf-nel","max_age":604800}
nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}
server: cloudflare
cf-ray: 7a436ed9de7d3a73-FRA
alt-svc: h3=":443"; ma=86400, h3-29=":443"; ma=86400
