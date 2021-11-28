#!/bin/bash
set -e

CLOUDFRONT_DISTRIBUTION_ID=$1
echo "Cloudfront: Invalidating /* for ${CLOUDFRONT_DISTRIBUTION_ID}"
aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"
