<script lang="ts">
  import {
    PresentationIcon,
    LayoutDashboardIcon,
    FolderArchiveIcon,
    UsersIcon,
    GraduationCapIcon,
    LogOutIcon
  } from 'lucide-svelte'

  let { data, children } = $props()
</script>

<div class="flex h-fit w-full">
  <aside
    class="bg-secondary-container border-primary/20 sticky top-0 left-0 max-h-screen min-h-screen w-1/6 border-r">
    <div class="w-full space-y-4 px-4 py-8">
      <h5 class="text-2xs">MAIN</h5>
      <div class="space-y-4">
        <a href="/private/dashboard" class="flex items-center space-x-2">
          <LayoutDashboardIcon size="16" />
          <span>Dashboard</span>
        </a>
        <a href="/private/courses" class="flex items-center space-x-2">
          <GraduationCapIcon size="16" />
          <span>Courses</span>
        </a>

        <a
          href="/private/training-seminars"
          class="flex items-center space-x-2">
          <PresentationIcon size="16" />
          <span>Training Seminars</span>
        </a>
      </div>
    </div>
    <div class="w-full space-y-4 px-4 pt-8 pb-16">
      <h5 class="text-2xs">RECORDS</h5>
      <div class="space-y-4">
        <a href="/private/records/users" class="flex items-center space-x-2">
          <UsersIcon size="16" />
          <span>Users</span>
        </a>
        <a href="/private/records/archive" class="flex items-center space-x-2">
          <FolderArchiveIcon size="16" />
          <span>Archive</span>
        </a>
      </div>
    </div>
    <div class="absolute bottom-0 left-0 w-full p-2 px-4">
      <a href="/auth/logout" class="flex items-center space-x-2">
        <LogOutIcon size="16" />
        <span>Logout</span>
      </a>
    </div>
  </aside>
  <main class="h-fit w-full flex-1">
    {@render children()}
  </main>
</div>
