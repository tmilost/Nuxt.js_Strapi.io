http://localhost:1337/graphql
# strapi login
email: tmilos94@gmail.com
password : Password1

# front login
email: boris@gmail.com
password : Password1


# Assessment

The assessment will be the following:

- Create a very simple version of a backoffice tool that a business can use internally to manage their day-to-day business.
- You will be building the following:
    - An admin should be able to login, **********************************************************no need for password reset or e-mail confirmation**********************************************************. We can create the user in the Strapi backend so no need for front-end user creation either.
    - The bearer token of the admin should be set as cookie so their login session is preserved.
    - Once logged in the admin should see a [tabbed layout](https://www.w3schools.com/howto/howto_js_tabs.asp) (their dashboard) where they can press trough.
    
    ## Tab one
    
    - **Tab one** should be a list view of ********Item******** which you will create in Strapi. Each ****************************************************item contains the following:****************************************************
        - Name (text)
        - Date (datetime)
        - Important (Boolean)
    - At the bottom of the list it should be possible to add a new item. Use GraphQL by preference and Strapi to create them. Make sure to read up on strapi permissions for logged in users, otherwise you will get a 401.
    
    ## Tab two
    
    - **************Tab two************** should contain a ‘edit my profile’ form. This should contain the following:
        - First name (create this field on the strapi user as it’s custom)
        - Last name (create this field on the strapi user as it’s custom)
        - E-mail address
        - Password
        - Biography (Textarea)
    - It should be possible to logout from this tab as well, so add a logout button. Make sure to clear the cookie and return to login screen.
    
    ## In general
    
    - Use your own GIT provider and share the repo with me at the end.
    - Make sure only authenticated users can access the dashboard, use nuxt middleware for that to check if the user is logged in, if not redirect to login page
    - Make the requests yourself using apollo/axios. Do not use the strapi module for Nuxt to authenticate as this does not allow you to showcase your apollo/axios skills.
    - I mostly use GraphQL, but it’s a pre if you can use both GraphQL and REST. So it would be cool if you can use GraphQL for the ********Item******** management and REST for the user edit form.
    - Use the ****************latest Strapi version**************** for the backend and make sure to use ****************postgres****************, no mysql.
    - I use **Nuxt/Vue 3+** (latest) for my **new** projects but use **Nuxt 2.17.1** for my **existing** projects. Moving with my existing projects from Nuxt 2 to Nuxt3 is time consuming and something I have not done and might never do. It’s up to you which one to use for this assessment.
    
    <aside>
    💡 It’s a plus when you do it in Typescript by using interfaces etc.
    
    </aside>


    
# 🚀 Getting started with Strapi

Strapi comes with a full featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
npm run develop
# or
yarn develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
npm run start
# or
yarn start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
npm run build
# or
yarn build
```

## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). Browse the [deployment section of the documentation](https://docs.strapi.io/dev-docs/deployment) to find the best solution for your use case.

## 📚 Learn more

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Strapi blog](https://strapi.io/blog) - Official Strapi blog containing articles made by the Strapi team and the community.
- [Changelog](https://strapi.io/changelog) - Find out about the Strapi product updates, new features and general improvements.

Feel free to check out the [Strapi GitHub repository](https://github.com/strapi/strapi). Your feedback and contributions are welcome!

## ✨ Community

- [Discord](https://discord.strapi.io) - Come chat with the Strapi community including the core team.
- [Forum](https://forum.strapi.io/) - Place to discuss, ask questions and find answers, show your Strapi project and get feedback or just talk with other Community members.
- [Awesome Strapi](https://github.com/strapi/awesome-strapi) - A curated list of awesome things related to Strapi.

---

<sub>🤫 Psst! [Strapi is hiring](https://strapi.io/careers).</sub>

useful links:
https://tute.io/install-configure-strapi-postgresql
https://strapi.io/blog/strapi-authentication-in-nuxt-js
https://quirky-heat-f4b.notion.site/Assessment-1957b1ad71f946868d7bb7e8ae4c4104
https://strapi.io/blog/setting-up-a-nuxt-app-with-strapi-using-graphql-building-an-event-app
https://quirky-heat-f4b.notion.site/Assessment-1957b1ad71f946868d7bb7e8ae4c4104
