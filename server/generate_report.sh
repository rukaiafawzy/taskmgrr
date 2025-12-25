#!/bin/bash

OUT=system_report.html

echo "<html><body><h1>System Report</h1>" > $OUT
echo "<p>Date: $(date)</p>" >> $OUT
echo "<h2>CPU</h2><pre>$(top -bn1 | head -5)</pre>" >> $OUT
echo "<h2>Memory</h2><pre>$(free -h)</pre>" >> $OUT
echo "<h2>Disk</h2><pre>$(df -h)</pre>" >> $OUT
echo "</body></html>" >> $OUT

echo "Report generated: $OUT"
