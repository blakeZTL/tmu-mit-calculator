<div class="grid grid-flow-dense grid-cols-5 grid-rows-5 gap-2 justify-items-center">
	{#each Array.from({ length: 6 }, (_, i) => i + 1) as item}
		<div id={`card-${item}`} class="skeleton h-32 w-32"></div>
	{/each}
	<div class="col-span-3 row-span-3">
		<div id="center-card" class="skeleton w-[400px] h-[400px]"></div>
	</div>
	{#each Array.from({ length: 10 }, (_, i) => i + 1) as item}
		<div id={`card-${item + 6}`} class="skeleton h-32 w-32"></div>
	{/each}
</div>
