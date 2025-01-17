<script lang="ts">
  let { data } = $props()
</script>

<div class="w-full">
  <div class="flex w-full flex-col px-2 py-8">
    <h3 class="pb-2 text-4xl font-bold">All Users</h3>
    <div class="bg-tertiary-container/20 w-full rounded-xl border p-2">
      <div class="">
        <div class="flex w-full p-2 text-xs font-bold">
          <div class="w-12"></div>
          <div class="w-2/5">Full Name</div>
          <div class="w-3/5">Email Address</div>
        </div>
        {#each data.users as recentUser, index (recentUser.id)}
          <div class="flex w-full items-center border-t p-2">
            {#if recentUser.photo}
              <img
                src={recentUser.photo}
                alt={recentUser.name}
                class="mr-4 h-8 w-8 shrink-0 rounded-full" />
            {:else}
              <div
                class="bg-primary mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <span class="text-on-primary">{recentUser.name?.at(0)}</span>
              </div>
            {/if}
            <p class="w-2/5 font-medium">{recentUser.name}</p>
            <a
              class="text-tertiary w-3/5 truncate underline decoration-1"
              href={`mailto:${recentUser.email}`}>{recentUser.email}</a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
