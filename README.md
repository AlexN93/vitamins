## Vitamins


##Tech Stack:
+ Node.js v7.6.0
+ Sails.js v0.12.11
+ Angular v2.4.5 with Typescript v2.2.1 
+ MongoDB v3.0.14

##API spec:

+ GET: /api/vitamins/58a224164fef861b24e2857a <br>
```
{
  "success": true,
  "data": [
    {
      "request": "3G 4B 5W",
      "actions": [
        [5,"W","B"],
        [3,"G","W"],
        [5,"B","G"],
        [4,"B","W"],
        [5,"G","W"]
      ],
      "createdAt": "2017-02-13T21:24:38.186Z",
      "updatedAt": "2017-02-13T21:24:38.186Z",
      "id": "58a224164fef861b24e2857a"
    }
  ]
}
```

+ GET: /api/vitamins/ <br>
```
{
  "success": true,
  "data": [
    {
      	"request": "3G 4B 5W",
      	"actions": [
	        [5,"W","B"],
	        [3,"G","W"],
	        [5,"B","G"],
	        [4,"B","W"],
	        [5,"G","W"]
      	],
      	"createdAt": "2017-02-13T21:24:38.186Z",
      	"updatedAt": "2017-02-13T21:24:38.186Z",
      	"id": "58a224164fef861b24e2857a"
    },
    {
    	"request": "3G 4G",
  		"actions": [
    		[4,"G","B"],
    		[3,G",W"],
    		[4,"B","W"]
  		],
		"createdAt": "2017-02-14T14:10:53.707Z",
		"updatedAt": "2017-02-14T14:10:53.707Z",
		"id": "58a30fed5a51766112634013"
	}
  ]
}
```


+ POST :  /api/vitamins/ <br>
```
Body request : 
{"vitamins": "3G 4B 5W"}
```
```
Response : 
{
	"request": "3G 4B 5W",
	"actions": [
    	[5,"W","B"],
        [3,"G","W"],
        [5,"B","G"],
        [4,"B","W"],
        [5,"G","W"]
	],
	"createdAt": "2017-02-13T21:24:38.186Z",
	"updatedAt": "2017-02-13T21:24:38.186Z",
	"id": "58a224164fef861b24e2857a"
}
```

##Getting started:
You will need to set up a db connection, to do that you have to edit config/connection.js and config/models.js.<br>
Also you might need a global sails installation.

```
$ git clone https://github.com/AlexN93/vitamins.git
$ npm install
$ typings install
$ tsc
$ sails lift
```