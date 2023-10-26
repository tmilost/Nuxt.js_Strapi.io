<!-- ./components/Editor.vue -->
<script lang="ts" setup>
import type { Ref } from 'vue'
// import icons
import { PlusCircleIcon } from "@heroicons/vue/solid";

const items: Ref<any[]> = ref([]);

interface RuntimeConfig {
  public: {
    graphqlURL: string;
  };
}

const {
  public: { graphqlURL },
}: RuntimeConfig = useRuntimeConfig();

interface User {
  // define properties of User interface
}

interface Session {
  // define properties of Session interface
}

const user: User = useUser();
const session: Session = useSession();

// data state
let isLoading: Ref<boolean> = ref(false);
let data: Ref<any> = ref(null);

let name: Ref<string> = ref("");
let date: Ref<string> = ref("");
let important: Ref<string> = ref("Important");
let action: Ref<string> = ref("create");
let inputValidation: Ref<boolean> = ref(false);
let selectedTab: Ref<number> = ref(1);

let username: Ref<string> = ref("");
let lastname: Ref<string> = ref("");
let email: Ref<string> = ref("");
let biography: Ref<string> = ref("");

// header object for fetch request
let headersList: { [key: string]: string } = {
  Accept: "*/*",
  // set authorization token
  // @ts-ignore
  Authorization: `Bearer ${session.value.data?.jwt}`,
  "Content-Type": "application/json",
};


const handleSubmit = (e: Event): void => {
  e.preventDefault();
  if (name.value === "" || date.value === "" || important.value === "Important") {
    inputValidation.value = true;
  } else {
    inputValidation.value = false;
    action.value == "create" ? postItems() : postItems();
  }
};

const getItems = async (): Promise<any[]> => {
  const allItemQuery = {
    query: `
    query Items {
    items {
      data {
        id
        attributes {
          Name
          Date
          Important
        }
      }
    }
  }
  `
  };
  try {
    // send request and return results or errors
    let { items, errors } = await sendReq(graphqlURL, { body: JSON.stringify(allItemQuery), headers: { "Content-Type": "application/json" } });
    if (errors) throw Error(errors);
    return items.data.map((a: any) => a.attributes);
  } catch (error) {
    console.log({ error });
  }
};

items.value = await getItems();

function formatDate(date: string): string {
    // @ts-ignore
  date = new Date(date);
    // @ts-ignore
  return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + ((date.getHours() + 24) % 12 || 12) + ':' + date.getMinutes();
};

function convertStringToBoolian(string: string): boolean | string {
  return string === 'true' ? true : (string === 'false' ? false : string);
};

function convertDateToIso(date: string): string {
  return new Date(date).toISOString()
};

const postItems = async (): Promise<void> => {
  isLoading.value = true;

  // comments query
  const allItemPost = {
    query: `
    mutation createItem ($name: String!, $date: DateTime, $important: Boolean) {
    createItem(
      data: {  Name: $name, Date: $date, Important: $important  }
    ) {
      data  {
        attributes{
          Name
        Date
        Important
        }
      }
    }
  }
  `,
    variables: {
      name: name.value,
      date: convertDateToIso(date.value),
      important: convertStringToBoolian(important.value),
    },
  };
  try {
    // send request and return results or errors
    const { errors } = await sendReq(graphqlURL, { body: JSON.stringify(allItemPost), headers: headersList });
    if (errors) throw Error(errors);
  } catch (error) {
    console.log({ error });
  } finally {
    name.value = "",
      date.value = ""
    important.value = "Important"
    isLoading.value = false;
    items.value = await getItems();
  }
};


function getUser(): void {
  // @ts-ignore
  if (user.value.id) {
    // @ts-ignore
    const response = $fetch("http://localhost:1337/api/users/" + user.value.id)
    response.then((value: any) => {
      username.value = value.username;
      lastname.value = value.lastname;
      email.value = value.email;
      biography.value = value.biography;
    }).catch((err: any) => {
      console.log(err);
    });
  }
}

getUser()
let userUpdated = ref(false);
async function editUser(): Promise<void> {
  userUpdated.value = false;
  // @ts-ignore
  if (user.value.id) {
    // @ts-ignore
    await $fetch(`http://localhost:1337/api/users/${user.value.id}`, {
      method: "PUT",
      headers: { Authorization: headersList.Authorization, },
      body: {
        username: username.value,
        lastname: lastname.value,
        email: email.value,
        biography: biography.value,
      }
    })
    userUpdated.value = true;
    setTimeout(() => {
      userUpdated.value = false;
    }, 1000);
  }
}

</script>
<template>
  <form :disabled="isLoading || data" @submit="handleSubmit" class="upload-form">
    <div class="wrapper">
      <div class="tab">
        <button class="tablinks" @click="selectedTab = 1">Items</button>
        <button class="tablinks" @click="selectedTab = 2">Edit My Profile</button>
      </div>

      <div v-if="selectedTab === 1">
        <div class="flex space-x-9 px-4 font-medium">
          <div class="w-1/6">Name</div>
          <div class="w-2/4">Date</div>
          <div class="w-1/6">Important</div>
        </div>

        <div class="flex space-x-9 px-4" v-for="item in items" :key="item">
          <div class="w-1/6">{{ item.Name }}</div>
          <div class="w-2/4">{{ formatDate(item.Date) }}</div>
          <div class="w-1/6">{{ item.Important }}</div>
        </div>

        <div class="form-control font-medium px-4 py-5">
          <label for="caption">Add Item</label>
          <textarea :disabled="isLoading || data" v-model="name" name="caption" id="caption" cols="30" rows="1"
            class="form-textarea caption-textarea" placeholder="Enter Name">
        </textarea>

          <input v-model="date" type="datetime-local" name="date" class="border-gray-200">

          <select v-model="important" id="countries" class="border-gray-200">
            <option selected>Important</option>
            <option value="true">true</option>
            <option value="false">false</option>
          </select>
        </div>

        <label class="input-validation px-4 text-red-500" v-if="inputValidation">Please fill out all required
          fields</label>
        <div class="flex action-cont px-4 py-5">
          <!-- Submit button -->
          <button :disabled="isLoading || data" type="submit" class="cta w-icon capitalize">
            <PlusCircleIcon v-if="!data" class="icon solid" />
            <span v-if="!data">{{ !isLoading ? `${action} Post` : "Hang on..." }}</span>
            <span v-else>Successfull! 🚀</span>
          </button>
        </div>
      </div>
    </div>
    <div v-if="selectedTab === 2">
      <div class="flex flex-col px-4 py-5 pb-5">
        <label class="caption font-medium pb-5">Edit Profile</label>
        <label class="caption">Username</label>
        <textarea v-model="username" name="username" cols="30" rows="1" class="form-textarea caption-textarea mb-3"
          placeholder="Name">
        </textarea>
        <label class="caption">Lastname</label>
        <textarea v-model="lastname" name="lastname" cols="30" rows="1" class="form-textarea caption-textarea mb-3"
          placeholder="Last name">
        </textarea>
        <label class="caption">Email</label>
        <textarea v-model="email" name="email" cols="30" rows="1" class="form-textarea caption-textarea mb-3"
          placeholder="Email">
        </textarea>
        <label class="caption">Biography</label>
        <textarea v-model="biography" name="biography" cols="30" rows="1" class="form-textarea caption-textarea mb-3"
          placeholder="Biography">
        </textarea>
        <label v-if="userUpdated" class="caption text-green-500">Updated</label>
        <div class="flex action-cont py-5">
          <!-- Submit button -->
          <button type="submit" @click="editUser" class="cta w-icon capitalize">
            <PlusCircleIcon class="icon solid" />
            <span> Update </span>
          </button>

        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.tab {
  overflow: hidden;
  border-bottom: 1px solid rgb(229 231 235/var(--tw-border-opacity));
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

.upload-form {
  @apply p-2 h-min bg-white border border-gray-200 rounded-xl;
}

.upload-form .wrapper {
  @apply flex flex-col gap-2;
}
</style>
