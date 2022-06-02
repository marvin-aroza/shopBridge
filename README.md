# shopBridge

Client Setup:-

Run the below commands in the root of the client project i.e inside the shopBridgeClient folder
1) npm i
2) ng serve

Server setup:-

Run the below commands in the root of the server project i.e inside the shopBridgeServer folder
1) npm i
2) change the .env files according to your config

Functionalities in Client:- 

General:-
1) Interceptors to handle header on api request
2) Interceptors to handle success and error on api response
3) Module Based approach
4) Preloading modules for fatser execution
5) PWA enabled for native feel in mobile

Homepage:
1) Product listing with api calls
2) Handled no product available scenario
3) Search the product with product name in the header. (Which works with behaviour subject)
4) Delete functionality with real time delete and reload feature
5) Navigation to view or edit product
6) Add button which navigates to the add product page
7) Inbuilt and custom pipe used to display the currency and display type of currency

Add/Edit Page:-
1) Both add and edit is handled in one single page with proper conditions
2) Used reactive forms
3) Form validations
4) Image upload feature
5) Custom directive to restrict user from adding any other character other than number in the price input field
6) Custom validator to restrict product price to not more than 10K
