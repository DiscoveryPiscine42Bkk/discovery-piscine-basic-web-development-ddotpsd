
if [ $# -eq 0 ];
then
	echo "No arguments supplied";
else
	for i in "$@";
	do
		touch "ex$i";
	done
fi