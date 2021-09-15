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
    <ul>
        {#each $apiData as job}
            <li>
                <div style="width: 40%;"> list item {job.name} </div>
                <div style="width: 40%;"> list item {job.device} </div>                
            </li>
        {/each}
    </ul>
</div>
