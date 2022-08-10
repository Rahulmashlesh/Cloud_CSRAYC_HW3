# Smart Photo Album 

Implement a photo album web application, that can be searched using natural language through both text and voice. 
Used Lex, ElasticSearch, and Rekognition to create an intelligent search layer to query photos for people, objects, actions and landmarks.

![image](https://user-images.githubusercontent.com/8120359/183785219-ee462e12-fe6f-4ec9-a86b-386e1e39b478.png)

### Use case:
For a given photo and a given search query, the service returns every photo that matches the query. 
Specifically, if Rekognition returns 12 labels for a given photo, the search will return the photo for any one of those 12 labels.
