<script>
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
</script>

<Header />

<main>
	<slot />
</main>

<footer>Hello, I'm the footer.</footer>
