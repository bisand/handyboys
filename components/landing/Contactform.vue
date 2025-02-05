<script setup>
onMounted(() => {
  const form = document.getElementById("form");
  const result = document.getElementById("result");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    form.classList.add("was-validated");
    if (!form.checkValidity()) {
      form.querySelectorAll(":invalid")[0].focus();
      return;
    }
    const formData = new FormData(form);
    // No conversion to JSON needed when uploading files
    result.innerHTML = "Sending...";

    const response = await $fetch("/api/contact", {
      method: "POST",
      body: formData,
      // Remove the Content-Type header so that the browser sets the boundary for multipart/form-data automatically.
    })

    const parsedResponse = JSON.parse(response.body);
    if (response.status == 200) {
      result.classList.add("text-green-500");
      result.innerHTML = parsedResponse.message;
    } else {
      console.log(response);
      result.classList.add("text-red-500");
      result.innerHTML = parsedResponse.message;
    }

    form.reset();
    form.classList.remove("was-validated");
    setTimeout(() => {
      result.style.display = "none";
    }, 5000);
  });
});
</script>

<template>
  <!-- To make this contact form work, create your free access key from https://web3forms.com/
     Then you will get all form submissions in your email inbox. -->
  <form action="" method="POST" id="form" class="needs-validation" novalidate>
    <!-- Create your free access key from https://web3forms.com/ -->
    <div class="mb-5">
      <input type="text" placeholder="Fullt navn" required
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500"
        name="name" />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn fullt navn.
      </div>
    </div>
    <div class="mb-5">
      <label for="email_address" class="sr-only">e-postadresse</label>
      <input id="email_address" type="email" placeholder="e-postadresse" name="email" required
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
      <input id="phone_number" type="tel" placeholder="Telefonnummer" name="phone_number" required pattern="[0-9]{8}"
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
      <select id="business_type" placeholder="Virksomhetstype" name="business_type" required
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
      <input type="text" placeholder="Adresse"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500"
        name="address" />
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Vennligst skriv inn adresse.
      </div>
    </div>
    <div class="mb-3">
      <textarea name="message" required placeholder="Din melding"
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500"></textarea>
      <div class="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
        Skriv en melding.
      </div>
    </div>
    <div class="mb-5">
      <label for="image_upload" class="sr-only">Last opp bilder</label>
      <input id="image_upload" type="file" name="images" accept="image/*" multiple
        class="w-full px-4 py-3 border-2 placeholder:text-gray-400 dark:placeholder:text-gray-600 rounded-md outline-none focus:ring-4 border-gray-300 focus:border-gray-600 ring-gray-100 dark:bg-gray-800 dark:border-gray-500 dark:focus:border-gray-700 dark:ring-gray-500" />
      <div class="empty-feedback text-red-400 text-sm mt-1">
        Vennligst last opp bilder.
      </div>
      <div class="invalid-feedback text-red-400 text-sm mt-1">
        Vennligst last opp gyldige bilder.
      </div>
    </div>
    <LandingButton type="submit" size="lg" block>Send melding</LandingButton>
    <div id="result" class="mt-3 text-center"></div>
  </form>
</template>

<style>
.invalid-feedback,
.empty-feedback {
  display: none;
}

.was-validated :placeholder-shown:invalid~.empty-feedback {
  display: block;
}

.was-validated :not(:placeholder-shown):invalid~.invalid-feedback {
  display: block;
}

.is-invalid,
.was-validated :invalid {
  border-color: #dc3545;
}
</style>
