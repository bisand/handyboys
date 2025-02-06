<script setup lang="ts">
const contactForm = ref<HTMLFormElement>() //document.getElementById("form") as HTMLFormElement
const resultDiv = ref<HTMLDivElement>() //document.getElementById("result")

const uploadedFiles = ref<File[] | null>(new Array<File>())

const form = ref({
  name: "",
  email: "",
  phone_number: "",
  business_type: "",
  address: "",
  message: "",
  images: [] as File[],
})
const onFileChange = (event: Event) => {
  const fileData = event.target as HTMLInputElement
  if (fileData.files && fileData.files.length) {
    form.value.images = Array.from(fileData.files)
  }
}

const submitForm = async () => {
  contactForm.value?.classList.add("was-validated")
  if (!contactForm.value?.checkValidity()) {
    (contactForm.value?.querySelectorAll(":invalid")[0] as HTMLFormElement).focus()
    return
  }

  if (resultDiv.value) {
    resultDiv.value.innerHTML = "Sending..."
  }

  const formData = new FormData()
  formData.append("name", form.value.name)
  formData.append("email", form.value.email)
  formData.append("phone_number", form.value.phone_number)
  formData.append("business_type", form.value.business_type)
  formData.append("address", form.value.address)
  formData.append("message", form.value.message)
  form.value.images.forEach((file, index) => {
    formData.append(`image${index}`, file)
  })

  try {
    const data = await $fetch("/api/contact", {
      method: "POST",
      body: formData,
      // Remove the Content-Type header so that the browser sets the boundary for multipart/form-data automatically.
    })

    const responseBody: string = data?.body as string
    const parsedResponse = JSON.parse(responseBody)
    if (data?.status == 200) {
      if (resultDiv.value) {
        resultDiv.value.classList.add("text-green-500")
        resultDiv.value.innerHTML = parsedResponse.message
      }
    } else {
      console.log(data)
      if (resultDiv.value) {
        resultDiv.value.classList.add("text-red-500")
        resultDiv.value.innerHTML = parsedResponse.message
      }
    }

    contactForm.value.reset()
    contactForm.value.classList.remove("was-validated")
    setTimeout(() => {
      if (resultDiv.value) {
        resultDiv.value.style.display = "none"
      }
    }, 5000)
  }
  catch (e: any) {
    console.error(e)
    if (resultDiv.value) {
      resultDiv.value.classList.add("text-red-500")
      resultDiv.value.innerHTML = e.message
    }
    setTimeout(() => {
      if (resultDiv.value) {
        resultDiv.value.style.display = "none"
      }
    }, 5000)
  }
}

</script>

<template>
  <!-- To make this contact form work, create your free access key from https://web3forms.com/
     Then you will get all form submissions in your email inbox. -->
  <form ref="contactForm" @submit.prevent="submitForm" id="form" class="needs-validation" novalidate>
    <!-- Create your free access key from https://web3forms.com/ -->
    <div class="mb-5">
      <input type="text" placeholder="Fullt navn" required v-model="form.name"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500"
        name="name" />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn fullt navn.
      </div>
    </div>
    <div class="mb-5">
      <label for="email_address" class="sr-only">e-postadresse</label>
      <input id="email_address" type="email" placeholder="e-postadresse" name="email" required v-model="form.email"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500" />
      <div class="empty-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn e-postadresse.
      </div>
      <div class="invalid-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn en gyldig e-postadresse.
      </div>
    </div>
    <div class="mb-5">
      <label for="phone_number" class="sr-only">Telefonnummer</label>
      <input id="phone_number" type="tel" placeholder="Telefonnummer" name="phone_number" required pattern="[0-9]{8}" v-model="form.phone_number"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500" />
      <div class="empty-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn Telefonnummer.
      </div>
      <div class="invalid-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn en gyldig telefonnummer.
      </div>
    </div>
    <div class="mb-5">
      <label for="business_type" class="sr-only">Virksomhetstype</label>
      <select id="business_type" placeholder="Virksomhetstype" name="business_type" required v-model="form.business_type"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500">
        <option value="" disabled selected>Velg virksomhetstype</option>
        <option value="Eiendomsselskap">Eiendomsselskap</option>
        <option value="Borettslag">Borettslag</option>
        <option value="Privat">Privat</option>
        <option value="Annet">Annet</option>
      </select>
      <div class="empty-feedback text-red-400 text-sm mt-1">
        Vennligst velg virksomhetstype.
      </div>
      <div class="invalid-feedback text-red-400 text-sm mt-1">
        Vennligst velg en gyldig virksomhetstype.
      </div>
    </div>
    <div class="mb-5">
      <input type="text" placeholder="Adresse" v-model="form.address"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500"
        name="address" />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn adresse.
      </div>
    </div>
    <div class="mb-3">
      <textarea name="message" required placeholder="Din melding" v-model="form.message"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500"></textarea>
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Skriv en melding.
      </div>
    </div>
    <div class="mb-5">
      <label for="image_upload" class="sr-only">Last opp bilder</label>
      <input id="image_upload" type="file" name="images" accept="image/*" multiple @change="onFileChange"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500" />
      <div class="empty-feedback text-red-400 text-sm mt-1">
        Vennligst last opp bilder.
      </div>
      <div class="invalid-feedback text-red-400 text-sm mt-1">
        Vennligst last opp gyldige bilder.
      </div>
    </div>
    <LandingButton type="submit" size="lg" block>Send melding</LandingButton>
    <div id="result" ref="resultDiv" class="mt-3 text-center"></div>
  </form>
</template>

<style>
.invalid-feedback,
.empty-feedback {
  display: none
}

.was-validated :placeholder-shown:invalid~.empty-feedback {
  display: block
}

.was-validated :not(:placeholder-shown):invalid~.invalid-feedback {
  display: block
}

.is-invalid,
.was-validated :invalid {
  border-color: #dc3545
}
</style>
