<template>
  <div class="auth-layout w-full">
    <el-container>
      <el-header>
        <NavBar />
      </el-header>

      <el-main class="h-screen">
        <slot />
      </el-main>

    </el-container>
  </div>
</template>
