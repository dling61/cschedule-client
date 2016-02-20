
function htmlEncode(value) {
	return $('<div/>').text(value).html();
}

/**
 * Create a new Object Id
 *
 * @method
 * @
 */
function getNextObjectId(userId, eId) {
	if (eId == 0) {
		return (userId * 10000 + 1);
	}
	else {
		return eId + 1;
	}
}
