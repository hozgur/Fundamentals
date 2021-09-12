<script>
	export let name;
</script>

<main>
	<div class="toolbar">
		<select class="selectdiv">
			<option value="">Mimaki Ts100-1</option>
			<option value="">Mimaki Jv 300</option>
			<option value="">File 2</option>
			<option value="">File 3</option>
		</select>
		<button>
			<span class="material-icons">settings</span>
		</button>
		<div class="job-actions">
			<button>
				<span class="material-icons">save</span>
			</button>
			<button>
				<span class="material-icons">delete</span>
			</button>
		</div>

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

.material-icons {
  font-family: 'Material Icons';
  font-weight: normal;
  font-style: normal;
  font-size: 24px;  /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  vertical-align: middle;  

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: 'liga';
}	
	.selectdiv {
		background-color: #404040;
		border-radius: 3px;
		color: #fff;
		box-sizing: content-box;
		-webkit-appearance: none;
		padding: 0.5em;
	}

	.selectdiv:after {
		font-family: "Material Icons";
    	content: "\e5cf";
	}
	.toolbar {
		display: flex;
		justify-content: flex-start;
		align-items: center;		
	}
	.toolbar button {
		margin-left: 5px;
		background-color: #404040;
		color: #fff;
		border-radius: 3px;		
	}

	.job-actions {
		display: flex;
		align-items: center;
		justify-content: flex-start;	
	}

	.job-actions button {
		margin-left: 5px;
		background-color: #404060;
		color: #fff;
		border-radius: 3px;		
	}

	.jobs {
		list-style: none;
		padding: 0;
		margin: 0;
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