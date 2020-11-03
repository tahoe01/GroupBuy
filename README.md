# GroupBuy

## API doc

1. Search API
   
   Request:
    * Method: GET
    * Sample URL: ?company=Apple&offset=0&limit=10
    * Description: 
  
        Support searching by `company`, `productName`, and `tag`, but only one condition per query. `limit` is the maximum number of results allowed to retrieve per query. `offset` specifies which row should be fetched first.

   Response:
    * Code: 200 (success)
    * Body: Array of product objects.