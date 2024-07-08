<script lang="ts">
	export let speed = false;
	export let fixName = 'Fix Name';
	export let selectedMIT = 5;
	export let holding = false;
	export let tbfm = false;

	let cardAccents = '';

	const mitSelections = [0, 5, 7, 10, 15, 20, 25, 30, 40];
	const calculatedRate = (selectedMIT: number, isSpeedSelected: boolean = speed) => {
		let rate = 0;
		switch (true) {
			case selectedMIT === 0:
				rate = 0;
				break;
			case selectedMIT < 7:
				rate = isSpeedSelected ? 45 : 65;
				break;
			case selectedMIT < 10:
				rate = isSpeedSelected ? 38 : 54;
				break;
			case selectedMIT < 15:
				rate = isSpeedSelected ? 30 : 42;
				break;
			case selectedMIT < 20:
				rate = isSpeedSelected ? 20 : 28;
				break;
			case selectedMIT < 30:
				rate = isSpeedSelected ? 12 : 17;
				break;
			case selectedMIT < 40:
				rate = isSpeedSelected ? 10 : 14;
				break;
			case selectedMIT < 50:
				rate = isSpeedSelected ? 8 : 11;
				break;
			default:
				break;
		}
		return rate;
	};
	$: rate = calculatedRate(selectedMIT, speed);
	$: if (holding) {
		cardAccents = 'card-bordered border-error shadow-error';
	} else if (tbfm) {
		cardAccents = 'card-bordered border-info shadow-info';
	} else {
		cardAccents = '';
	}

	const handleHoldSelect = () => {
		holding = !holding;
		tbfm = false;
		holding ? (selectedMIT = 0) : (selectedMIT = 5);
	};
	const handleTbfmSelect = () => {
		tbfm = !tbfm;
		holding = false;
		selectedMIT = 7;
	};
</script>

<div class="card shadow-xl w-64 {cardAccents}">
	<div class="card-body">
		<h2 class="card-title">{fixName.toUpperCase()}</h2>
		{#if !holding && !tbfm}
			<label class="form-control w-full max-w-xs">
				<div class="label">
					<span class="label-text">MIT</span>
					<span class="label-text-alt">Rate: {rate}</span>
				</div>
				<select class="select select-bordered" bind:value={selectedMIT}>
					<option disabled selected>Select</option>
					{#each mitSelections as selection}
						<option value={selection}>{selection}</option>
					{/each}
				</select>
				<div class="label">
					<span class="label-text-alt"></span>
				</div>
			</label>
		{/if}
		{#if !holding}
			<div class="form-control">
				<label class="label cursor-pointer">
					<span class="label-text">Speed at fix</span>
					<input
						type="checkbox"
						class="toggle toggle-warning"
						checked={speed}
						on:change={() => (speed = !speed)}
					/>
				</label>
			</div>
		{/if}
		{#if !holding && !tbfm}
			<div class="card-actions justify-end">
				<button class="btn btn-error" on:click={handleHoldSelect}>HOLD</button>
				<button class="btn btn-info" on:click={handleTbfmSelect}>TBFM</button>
			</div>
		{:else if holding}
			<div class="card-actions justify-end">
				<button class="btn btn-error" on:click={handleHoldSelect}>CANCEL HOLDING</button>
			</div>
		{:else if tbfm}
			<div class="card-actions justify-end">
				<button class="btn btn-info" on:click={handleTbfmSelect}>CANCEL TBFM</button>
			</div>
		{/if}
	</div>
</div>
