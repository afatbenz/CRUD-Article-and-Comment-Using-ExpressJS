# Create Article (POST)
Payload = title (string), content(string)
>curl --location --request POST 'localhost:3100/article/submit' \
--header 'authID: 1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "NodeJS Express V1",
    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'\''s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
}'


# Show All Article (GET)
> curl --location --request GET 'localhost:3100/article/all' \
--data-raw ''


# Detail Article (GET)
param = id
> curl --location --request GET 'localhost:3100/article/detail/1' \
--data-raw ''



# Update Article (POST)
Payload = title (string), content(string)
> curl --location --request POST 'localhost:3100/article/update/2' \
--header 'authID: 1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "title": "NodeJS Express V1 - Update",
    "content": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Ini sudah diupdate."
}'


# Delete Article (GET)
Param = id
> curl --location --request GET 'localhost:3100/article/delete/1' \
--header 'authID: 1' \
--header 'Content-Type: application/json' \


# Add Comment (POST)
Payload = articleID (int), comment (string)
> curl --location --request POST 'localhost:3100/article/comment/submit' \
--header 'authID: 1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "articleID": 1,
    "comment": "Ini komentar pertama saya di article V1"
}'


# Update Comment (POST)
Payload = articleID (int), commentID (int), comment (string)
> curl --location --request POST 'localhost:3100/article/comment/update' \
--header 'authID: 1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "articleID": 1,
    "commentID": 1,
    "comment": "Ini komentar ke pertama saya di article V1 diupdate"
}'


# Delete Comment (POST)
Payload = articleID (int), commentID (int)
> curl --location --request POST 'localhost:3100/article/comment/delete' \
--header 'authID: 1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "articleID": 1,
    "commentID": 1
}'
