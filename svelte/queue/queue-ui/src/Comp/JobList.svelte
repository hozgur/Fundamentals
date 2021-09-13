<script>
    import { onMount } from "svelte";
    import { writable, derived } from 'svelte/store';
    // console.log("fetch data");
    const apiData = writable([]);
    // fetch("/api/jobs")
    //     .then((response) => response.json())
    //     .then((job) => {
    //         console.log("job =", job);
    //         joblist = job;
    //     });

    onMount(async () => {
        fetch(
            "/api/jobs")
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                apiData.set(data.jobs);
            })
            .catch((error) => {
                console.log(error);
                return [];
            });
    });
</script>

<div class="job-list">
    <div class="job-list-header">
        <h1>Job List</h1>
    </div>
    <ul>
        {#each $apiData as job}
            <li>list item {job.name} x {job.device}</li>
        {/each}
    </ul>
</div>
