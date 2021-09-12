<script>
	export let name;
</script>

<main>
	<div class="toolbar">
		<select>
			<option value="">Mimaki Ts100-1</option>
			<option value="">Mimaki Jv 300</option>
			<option value="">File 2</option>
			<option value="">File 3</option>
		</select>
		<button>Device</button>
	</div>

	<div class="content">
		<ul class="jobs">
			<li>
				<div class="job-info">
					job
				</div>	
			</li>
		</ul>
	</div>
</main>

<style>
	.jobs {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.job-status-icon {
		background-image: url(../../assets/images/job-status-icon.svg);
	}
	.job-status-icon.running {
		background-image: url(../../assets/images/job-status-icon-running.svg);
	}
	.job-status-icon.paused {
		background-image: url(../../assets/images/job-status-icon-paused.svg);
	}
	.job-status-icon.canceled {
		background-image: url(../../assets/images/job-status-icon-canceled.svg);
	}
	.job-status-icon.failed {
		background-image: url(../../assets/images/job-status-icon-failed.svg);
	}
	.job-status-icon.completed {
		background-image: url(../../assets/images/job-status-icon-completed.svg);
	}
	.job-status-icon.unknown {
		background-image: url(../../assets/images/job-status-icon-unknown.svg);
	}
	.job-info {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: space-between;
		padding: 0.5rem;
		border-radius: 0.25rem;
		background-color: #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	}
	.job-name {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}
	.job-name span {
		font-size: 1.25rem;
		font-weight: 500;
		color: #000;
	}
	.job-progress {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.job-progress-bar {
		width: 100%;
		height: 0.5rem;
		border-radius: 0.25rem;
		background-color: #e6e6e6;
	}
	.job-progress-bar-fill {
		width: 0%;
		height: 100%;
		border-radius: 0.25rem;
		background-color: #00a1ff;
	}
	.job-progress-text {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		font-weight: 500;
		color: #000;
	}
	.job-progress-text span {
		margin-left: 0.5rem;
	}
	.job-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 0.5rem;
	}
	.job-actions button {
		font-size: 1rem;
		font-weight: 500;
		color: #000;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		border: 1px solid #e6e6e6;
		background-color: #fff;
		box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
	}
	.job-actions button:first-child {
		margin-right: 0.5rem;
	}
	.job-actions button:last-child {
		margin-left: 0.5rem;
	}
	.job-actions button.canceled {
		background-color: #e6e6e6;
		border-color: #e6e6e6;
	}
	.job-actions button.canceled:hover {
		background-color: #e6e6e6;
		border-color: #e6e6e6;
	}
	.job-actions button.canceled:active {
		background-color: #e6e6e6;
		border-color: #e6e6e6;
	}
	.job-actions button.canceled:focus {
		background-color: #e6e6e6;
		border-color: #e6e6e6;
	}


	main {
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
		background-color: #404040;
	}

	button {
		background-color: #404040;
		color: #fff;
		border-radius: 3px;
		padding: 0.5em;
	}
	select {
		background-color: #404040;
		border-radius: 3px;
		color: #fff;
		box-sizing: content-box;
		-webkit-appearance: none;
		padding: 0.5em;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>