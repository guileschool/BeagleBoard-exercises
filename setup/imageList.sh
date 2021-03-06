#!/bin/bash
# Goes to rcn-ee to list current images
# Run without parameter to list what available
# imageList.sh 2017-05-14 to get the 2017-05-14 iot image
SITE=https://rcn-ee.com/rootfs/bb.org/testing/ 
RELEASE=stretch-iot
if [ "$1" == "" ]; then
	curl $SITE | sed -n '/^$/!{s/<[^>]*>//g;p;}' | awk -F/ '{print $1}'
	echo $SITE
elif [ "$1" == "web" ]; then
	google-chrome $SITE
else
	echo $1
	cd ~/BeagleBoard/Images
	     wget $SITE/$1/$RELEASE/bone-debian-$RELEASE-armhf-$1-4gb.bmap
	     wget $SITE/$1/$RELEASE/bone-debian-$RELEASE-armhf-$1-4gb.img.xz.sha256sum
	time wget $SITE/$1/$RELEASE/bone-debian-$RELEASE-armhf-$1-4gb.img.xz
fi
