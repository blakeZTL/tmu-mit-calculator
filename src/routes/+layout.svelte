<script lang="ts">
	import { FontAwesomeIcon } from '@fortawesome/svelte-fontawesome';
	import '../app.css';
	import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
</script>

<div class="navbar bg-base-100">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost text-xl">MIT Calculator</a>
	</div>
	<div class="flex-none">
		<button class="btn btn-square btn-ghost">
			<FontAwesomeIcon icon={faEllipsis} size="2x" />
		</button>
	</div>
</div>
<slot />
