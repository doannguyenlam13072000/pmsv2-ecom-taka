<script setup lang="ts">
import { useSignIn } from "./useSignIn";

const { schema, initialValues, handleSignInForm } = useSignIn();
</script>

<template>
  <div class="p-4">
    <h1 class="text-xl font-bold mb-4">
      Sign In
    </h1>

    <FormWrapper
      :schema="schema" :initial-values="initialValues" :on-submit="handleSignInForm" submit-label="Sign In"
      :reset-after-submit="true"
    >
      <FormText label="Email" name="email" type="email" />
      <FormText label="Password" name="password" type="password" />
      <FormCheckBox name="rememberMe" checkbox-label="Remember me" />
    </FormWrapper>
  </div>
</template>
