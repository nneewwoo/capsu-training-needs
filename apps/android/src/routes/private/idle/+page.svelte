<script lang="ts">
  const titles = [
    'Hang tight',
    'Take a breather',
    'Relax for a bit',
    'Chill out',
    'Take a break'
  ]

  const descriptions = [
    'The next seminar isn’t scheduled yet, but stay tuned! We’ll have something exciting for you soon!',
    'No seminars yet, but in the meantime, keep learning and stay inspired!',
    'No seminars scheduled at the moment, but we’re working on something special for you!',
    'We’re gearing up for the next seminar. Stay patient and stay curious!'
  ]
</script>

<div
  class="flex h-[calc(100vh_-_5rem)] w-full flex-col items-center justify-center px-8">
  <h1 class="pb-8 font-serif text-5xl font-semibold">
    {titles[Math.floor(Math.random() * titles.length)]}
  </h1>
  <p class="text-center text-sm" data-g>
    {descriptions[Math.floor(Math.random() * descriptions.length)]}
  </p>
</div>
