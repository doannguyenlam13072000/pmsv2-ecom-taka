<template>
  <div class="auth-layout">
    <el-container>
      <el-header class="!px-0">
        <NavBar />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <SideBar />
        </el-aside>
        <el-container>
          <el-main>
            <slot />
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
