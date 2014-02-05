<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title><?php echo $title . '-' . $subtitle; ?></title>
		<script src='/period_app/scripts/vendors/require.js'></script>
		<script src='/period_app/scripts/config.js'></script>
		<script src="/period_app/scripts/<?php echo $js?>.js"></script>
		<link rel="stylesheet" href="/period_app/css/jquery-ui/jquery-ui-1.10.3.custom.css" type="text/css"/>
		<link rel="stylesheet" href="/period_app/css/main.css" type="text/css"/>
	</head>
	<body>
		<?php echo $header;?>
		
		<div role="main" class="page_content">
			<?php echo $body; ?>
		</div>
		
		<?php echo $footer; ?>
	</body>
</html>