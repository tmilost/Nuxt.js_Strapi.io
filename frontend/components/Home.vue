<!-- Please remove this file from your project -->
<template>
  <div class="home">

    <div class="tab">
      <button class="tablinks" @click="selectedTab = 1">Items</button>
      <button class="tablinks" @click="selectedTab = 2">Edit My Profile</button>
    </div>
    <div v-if="selectedTab === 1" class="tabcontent">

      <div class="items">
        <div v-for="item in items.data" :key="item.id">{{ item.attributes.Name }} {{ item.attributes.Date }}
          {{ item.attributes.Important }}</div>

      </div>
      <p class="padding-20">Add item</p>
      <div class="add-item">

        <input v-model="name" type="email" class="
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light
            " placeholder="email" />

        <input v-model="date" type="datetime-local" name="date" class="  
              margin-20
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light">


        <input v-model="important" type="checkbox" name="important" value="important" checked class=" margin-20
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light"">

                    <button type=" button" class=" 
              margin-20
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light" @click="postItems()">Add Item</button>
      </div>
    </div>
    <div v-if="selectedTab === 2" class="tabcontent tabcontent-second">
      <a class="log-out-text text-bleck p-2 hover:bg-gray-700 " href="/user/login" @click="userLogout()">Logout</a>


      <input v-model="username" type="email" class="
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light
            " placeholder="username" required />

      <input v-model="email" type="email" class="
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light
            " placeholder="email" required />

      <input v-model="lastname" type="email" class="
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light
            " placeholder="lastname" required />

      <textarea v-model="biography" class="
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light
            " rows=" 4" cols="50"></textarea>


      <button 
              class="
              shadow-sm
              bg-gray-50
              border border-gray-300
              text-gray-900 text-sm
              rounded-lg
              focus:ring-blue-500 focus:border-blue-500
              block
              p-2.5
              dark:bg-gray-700
              dark:border-gray-600
              dark:placeholder-gray-400
              dark:text-white
              dark:focus:ring-blue-500
              dark:focus:border-blue-500
              dark:shadow-sm-light
            " type="button" @click="editUser()">Edit User</button>
    </div>

  </div>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import axios from 'axios';
import { allItemQuery, postItem } from "../graphql/query";

interface User {
  username: String;
  lastname: String;
  email: String;
  biography: String;
}

export default {
  name: 'HomePage',
  middleware: "auth",

  data() {
    return {
      items: [],
      selectedTab: 1,
      name: '',
      date: '',
      important: false,
      username: '',
      email: '',
      lastname: '',
      biography: '',
    }
  },

  computed: {
    ...mapGetters(["loggedInUser", "isAuthenticated"]),
  },

  mounted() {
    if(!this.loggedInUser){
      this.$router.push('/user/login')
    }
    this.getItems()
  },

  methods: {
    editUser() {
      if(this.username && this.lastname && this.email && this.biography && this.loggedInUser.id){
        axios.put<User>('http://localhost:1337/api/users/' + this.loggedInUser.id, {
        data: {
          username: this.username,
          lastname: this.lastname,
          email: this.email,
          biography: this.biography,
        },
      }).catch(function (error) {
        console.log(error);
      });
      }
    
    },
    getItems() {
      this.$apollo
        .query({
          query: allItemQuery,
        })
        .catch((e: Error) => {
          console.log(e);
        })
        .then((data: any) => {
          this.items = data.data.items;
        })
    },
    postItems() {
      this.$apollo
        .mutate({
          mutation: postItem,
          variables: {
            name: this.name,
            date: new Date(this.date).toISOString(),
            important: this.important,
          }
        }).catch((e) => {
          console.log(e)
        })
    },
    async userLogout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style>
.home {
  background-color: rgb(24 24 37);
  color: rgb(192 192 206);
  height: 100vh;
}

.tab {
  overflow: hidden;
  border-bottom: 1px solid rgb(74, 74, 106);
  background-color: rgb(33 33 51);
}

.tab button {
  background-color: inherit;
  float: left;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 14px 16px;
  transition: 0.3s;
}

.tab button:hover {
  background-color: #181825;
}

.tab button.active {
  background-color: #ccc;
}

.items {
  padding-left: 20px;
  display: flex;
  flex-direction: column
}

.items {
  padding: 20px 0 20px 20px;
  display: flex;
  flex-direction: column
}

.add-item {
  padding: 20px 0 20px 20px;
  display: flex;
  flex-direction: row
}

.margin-20 {
  margin: 0 20px 0 20px;
}

.padding-20 {
  padding: 20px 0 0 20px;
}

.tabcontent-second {
  margin: 20px 20px 0 20px;
}

.log-out-text {
  margin: 100px;
  height: 2rem;
  border: 1px solid rgb(74, 74, 106);
  background: rgb(24, 24, 38);
}
</style>
