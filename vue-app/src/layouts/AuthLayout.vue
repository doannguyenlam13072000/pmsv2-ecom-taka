<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <NavBar />
      </el-header>

      <el-main>
        <slot />
      </el-main>
      
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
