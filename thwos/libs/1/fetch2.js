async function fetch2(url, init, type) {
	if (typeof init === "string") [init, type] = [, init]
	if (!type) type = "text"
	return (await fetch(url, init))[type]()
}
