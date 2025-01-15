<script lang="ts">
  const titles = [
    'It’s seminar time!',
    'Don’t miss out!',
    'Time to join in!',
    'Heads up!',
    'The seminar is happening!',
    'Join the crowd!',
    'Be part of the action!',
    'Let’s get started!',
    'It’s happening live!',
    'Ready to learn?'
  ]

  const descriptions = [
    'The seminar is starting now — head over and join us!',
    'Grab your seat — the seminar is live and waiting for you!',
    'The room is buzzing — don’t miss out on the action!',
    'It’s happening right now — come join the seminar in person!',
    'The doors are open — step in and experience the seminar firsthand!',
    'The seminar is live and in full swing — come and be part of it!',
    'Knowledge is unfolding — head to the seminar venue now!',
    'Don’t miss the energy — join the seminar happening right here, right now!',
    'The learning is happening live — take your seat and dive in!',
    'You’re invited to the live seminar—join us at the venue now!'
  ]
</script>

<div
  class="flex h-[calc(100vh_-_5rem)] w-full flex-col items-center justify-center px-8">
  <h1 class="pb-8 text-center font-serif text-5xl font-semibold">
    {titles[Math.floor(Math.random() * titles.length)]}
  </h1>
  <p class="text-center text-sm" data-g>
    {descriptions[Math.floor(Math.random() * descriptions.length)]}
  </p>
</div>
