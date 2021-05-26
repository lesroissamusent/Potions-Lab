# Potions Lab

![Potions-Screen Recording copy](https://user-images.githubusercontent.com/74684118/117988678-8de17880-b333-11eb-9002-0a13c9e0b59c.gif)

Click [here](url) to create some potions..

## Table of contents: 
* [Brief](#brief)
* [Requirements](#requirements)
* [Timeframe](#timeframe)
* [Technologies Used](#technologies-used)
* [Process](#process)
  * [Planning](#planning)
  * [Project Elements](#project-elements)
  * [Styling](#styling)
  * [Challenges](#challenges)
  * [Wins](#wins)
* [Bugs](#bugs)
* [Future Features](#future-features)
* [Key Learnings](#key-learnings)

## Brief:
The brief for this project was to work in groups or individually to build a full-stack application with a Python back-end and a React front-end. I chose to work on my own, primarily due to a desire to consolidate all my learning from course, but also because I had just completed a group project of similar scale and felt it would be good to have a similar experience on my own. 

## Requirements: 

1. A working app hosted on the internet
2. Full-stack application
3. Django REST Framework to serve data from a Postgres database
4. Front-end built with React
5. Multiple relationships
6. CRUD functionality
7. Planning through wireframe/user stories/pseudo-code
8. Visually impressive design
9. Git repo hosted on GitHub with a readme.md file
10. Deployed online

## Timeframe:
10 days

## Technologies Used:
Python

Django

Postgres

Insomnia

TablePlus

React.js - hooks

Node.js

SCSS

Bulma

Axios

Nodemon

Git/GitHub


## Process
### Planning

The idea for this project came from the research I had done for a different project, where I had wanted to use a Harry Potter API and couldn't find one with enough data. I knew I wanted to do something with Harry Potter and I also wanted there to be a game element to it. My idea was to build an app that mimics a potions lab where familiar harry potter ingredients can be used alongside brewing directions to create custom potions, with a 'potions cupboard' page that would have pre-made, real Harry Potter potions to get inspiration from. 

**WireFrame and Plan for Sign-off (Including MVP and Bonus Features)**
<img width="968" alt="Potions-wireframe" src="https://user-images.githubusercontent.com/74684118/117984901-270e9000-b330-11eb-8e6d-ecd2d63bd680.png">

### Project Elements

Due to some issues, which I have outlined below, the plan I made for this project was not realised in the way that I wanted. Instead I created a simple app where the user can browse potions and create and edit their own once they have logged in.

**Back-end**

Example Model (Potion):
```js
class Potion(models.Model):
    name = models.CharField(max_length=50)
    owner = models.ForeignKey(
        "jwt_auth.User",
        related_name="potions",
        on_delete= models.CASCADE
    )
    image = models.CharField(max_length=300)
    ingredients = models.ManyToManyField('ingredients.Ingredient', related_name="potions")
    instructions = models.ManyToManyField('instructions.Instruction', related_name="potions")

    def __str__(self):
        return f"{self.name} - {self.owner}"
 ```
 
 Example View (Ingredient):
 ```js
 class IngredientDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get_ingredient(self, pk):
        try:
            return Ingredient.objects.get(pk=pk)
        except Ingredient.DoesNotExist:
            raise NotFound(detail="😭 Cannot find that ingredient")

    def get(self, _request, pk):
        ingredient = self.get_ingredient(pk=pk)
        serialized_ingredient = IngredientSerializer(ingredient)
        return Response(serialized_ingredient.data, status=status.HTTP_200_OK)

    def delete(self, _request, pk):
        ingredient_to_delete = self.get_ingredient(pk=pk)
        ingredient_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, pk):
        ingredient_to_edit = self.get_ingredient(pk=pk)
        updated_ingredient = IngredientSerializer(ingredient_to_edit, data=request.data)
        if updated_ingredient.is_valid():
            updated_ingredient.save()
            return Response(updated_ingredient.data, status=status.HTTP_202_ACCEPTED)
        return Response(updated_ingredient.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)
 ```
 
 Project urls:
 ```js
urlpatterns = [
    path('api/potions/', include('potions.urls')),
    path('api/auth/', include('jwt_auth.urls')),
    path('api/ingredients/', include('ingredients.urls')),
    path('api/instructions/', include('instructions.urls'))
]
 ```
 
 Auth:
 ```js
 User = get_user_model()

class JWTAuthentication(BasicAuthentication):

    def authenticate(self, request):
        header = request.headers.get('Authorization')
        if not header:
            return None 
        
        if not header.startswith('Bearer'):
            raise PermissionDenied(detail='Invalid Auth token')

        token = header.replace('Bearer ', '')

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(pk=payload.get('sub'))
        except jwt.exceptions.InvalidTokenError:
            raise PermissionDenied(detail='Invalid token')
        except User.DoesNotExist:
            raise PermissionDenied(detail='User not found')

        return (user, token)
 ```


**Front-end**

I didn't want a user to be able to create, edit or delete potions without signing in, so the 'Create a Potion' button is hidden when the user isn't authenticated. 

Authenticated
<img width="1281" alt="potion-index-signed-in" src="https://user-images.githubusercontent.com/74684118/118008806-58458b00-b345-11eb-83ce-79dd1632eb43.png">

Not authenticated
<img width="1270" alt="potion-index" src="https://user-images.githubusercontent.com/74684118/118008817-5a0f4e80-b345-11eb-92a4-04decbcf77cd.png">

 ```js
 <div className="columns is-multiline">
        { getPayloadFromToken(userID) &&
            <>
              <div className="create-button">
                <Link to={'/makepotion'} className="button">Create a Potion</Link>
              </div>
            </>
        }
      </div>
```
 
 Also when signed in, the user can see individual potions with more detail
 <img width="1353" alt="potion-show" src="https://user-images.githubusercontent.com/74684118/118008822-5aa7e500-b345-11eb-90b0-d673c15d377b.png">
 
 ```js
 const SinglePotionShow = () => { 
  const params = useParams()
  const history = useHistory()
  const userID = getPayloadFromToken().sub 

  const [potion, setPotion] = useState(null)
  const [user, setUser] = useState(null)

  const [isModalActive, setIsModalActive] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get(`/api/potions/${params.id}`)
      setPotion(response.data)
      console.log('Single potion RESPONSE.DATA', response.data)
    }
    getData()
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      const response = await axios.get(`/api/auth/user/${userID}`)
      setUser(response.data)
      console.log('Single potion RESPONSE.DATA', response.data)
    }
    getUserData()
  }, [])

  const handleDelete = async () => {
    await axios.delete(`/api/potions/${params.id}`, {
      headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage()}`,
      },
    })
    history.push('/potions')
  }

  const triggerModal = () => {
    setIsModalActive(!isModalActive)
  }


  if ( !potion || !user ) return null
 ```
 
 The potion creation form was one of the most detailed parts of the app. After deciding on react-select I found that different approaches were needed depending on the form field. The instructions and ingredients needed to be mapped, as they were being fed through the seeds file, but the while the information I sent through had to come from the populated serialiser, the select option needed to show only the name of the ingredient or instruction.
 
 <img width="539" alt="potion-form" src="https://user-images.githubusercontent.com/74684118/118008832-5c71a880-b345-11eb-8bd1-b526525e871b.png">

 ```js
useEffect(() => {
    const getPotion = async () => {
      const response = await axios.get(`/api/potions/${params.id}`)
      const ingredientsMap = response.data.ingredients.map(ingredient => {
        const { id, name } = ingredient
        return { value: id, label: name }
      })
      setPopIngredients(ingredientsMap)
      const instructionsMap = response.data.instructions.map(instruction => {
        const { id, description } = instruction
        return { value: id, label: description }
      })
      console.log('response.data', response.data)

      setPopInstructions(instructionsMap)
      const { data } = response
      
      // could not populate the form fields above as the data had not been requested yet.
      const newFormData = {
        name: data.name,
        owner: userID,
        image: data.image,
        ingredients: ingredientsMap.map(item => item.value),
        instructions: instructionsMap.map(item => item.value),
      }
      setFormData(newFormData)
      // console.log('ingredients.map', ingredientsMap)
    }
    getPotion()
  }, [])
 ```
 
 
 example options (ingredient)
 ```js
 const ingredientsOptions = ingredients.map(ingredient => {
    const { id, name } = ingredient
    return { value: id, label: name }
  })
 ```
 
 
  example for form field (ingredient)
 ```js
 <div className="field">
          <label className="label">Ingredients:</label>
          <div className="control">
            <Select
              name="ingredients"
              defaultValue={popIngredients}
              options={ingredientsOptions}
              components={makeAnimated()}
              onChange={(selected) => handleIngredientsSelect(selected, 'ingredients')}
              isMulti
              styles={customStyles}
            />
          </div>
 ```


### Styling
* What I tried to achieve with the styling was to create the air of the Harry Potter books and movies without using actual HP imagery. I had to decide whether I wanted to use, for example, pictures of Hogwarts or the HP font but ultimately felt that it would look cooler to simply style the app with the same feel.

### Challenges
* My biggest challenge was learning to work on my own on a project with this level of detail. I found myself making small mistakes that took hours to fix because I couldn't see typo or missed a step which threw an error in a seemingly unrelated area. 
* This was especially evident in my back-end work which meant that I spent multiple days on the backend and ended up not having enough time to work on the front-end. 
* Having to completely change the functionality of the app was a big blow, I had such a clear idea of what I wanted to do during planning, and discovering that I didn't have enough time to achieve this on my own meant that I had wasted a lot of time working on elements that never came to fruition. I had to learn to improvise and create a project which worked similarly to my plan but looked and felt completely different. I found that what I really lost as a result was the game feel. 
* My original plan would have required a drag and drop function for the potion making. In order to manage my time more accurately, I switched to using react-select instead which would require less time to implement but achieve similar functionality. 

### Wins
* I love the look of the app, I think it walks the line between fun and visually impactful very well. 
* It was hugely satusfying to create a full-stack application on a solo project. 

## Bugs
* The sign-in and sign-out links on the navbar don't show until the page is refreshed.
* If the user clicks on one of the potions on the potion index page, they are sent to the individual potion show page. This works while the user is authenticated but should show an error message when an unathenticated user clicks. Currently the user is sent to a blank page. 

## Future Features
Having now completed the project I know that there are many features that could be added to make it a more well-rounded application. I will outline a few of these below, although I feel that if I decide to work more on this idea it will probably make more sense to use my learning from this project to start from scratch with a new app. 

* Profile page
  * user info
  * user potions
  * user levels (novice, master) dependant on number of potions created
* Social aspect
  * favouriting potions
  * commenting on potions
  * sharing potions
  * badges
* Integration of more HP lore
  * dedicated ingredients page
  * more information on HP potions, including references to specific use cases from the books 

## Key Learnings
* I've definitely learned to deal with errors better, and trace them back to the root of the problem. 
* This project really highlighted the need to add in contingency time for when things go wrong. I feel like the success of my app was too dependant on everything going right which meant that I had to cut too many corners to make it work once things started going wrong. 
* The benefits of having a second pair of eyes turned out to be more integral to the coding process than I expected. I spent a lot of time on this project trying not to ask for help, to the detriment of the final product. Often issues that took multiple hours to solve ended up being tiny mistakes that another person could have pointed out within minutes. 
