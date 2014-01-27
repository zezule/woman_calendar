<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title><?php echo $title . '-' . $subtitle; ?></title>
		<script data-main="../../scripts/main.js" src="<?php echo APPPATH.'../../../scripts/vendors/require.js' ?>"></script>
		<link rel="stylesheet" href="<?php echo APPPATH. '../../../css/jquery-ui/jquery-ui-1.10.3.custom.css'; ?>" type="text/css"/>
		<link rel="stylesheet" href="<?php echo APPPATH. '../../../css/main.css'; ?>" type="text/css"/>
	</head>
	<body>
		<?php echo $header;?>
		
		<div role="main" class="page_content">
			<?php echo $body; ?>
		</div>
		
		<?php echo $footer; ?>
	</body>
</html>