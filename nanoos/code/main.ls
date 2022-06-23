App = m.comp do
	oninit: !->
		@textInputVal = "Thiên hà"
		@checkboxChecked = no
		@menuItems =
			* text: "Mở"
				color: \blue
			* text: "Mở bằng"
				items:
					* text: "Messenger"
						icon: \facebook-messenger
					* text: "Facebook"
						icon: \facebook-square
					* text: "Microsoft Edge"
						icon: \edge
			,,
			* text: "Sao chép"
				icon: \clone
			* text: "Cắt"
				icon: \scissors
			* text: "Dán"
				icon: \clipboard
			* header: "Chỉnh sửa"
			* text: "Chọn tất cả"
				label: \Ctrl+A
			* text: "Căn lề"
				items:
					* text: "Trái"
					* text: "Giữa"
					* text: "Phải"
			* text: "Thụt lề"
				icon: \indent
				items:
					* text: "2"
					* text: "4"
					* text: "6"
					* text: "8"
			,,
			* text: "Xóa"
				icon: \trash-alt
				color: \red
				label: \Delete
			* text: "Thông tin"
				icon: \info

	view: ->
		m \div,
			m \p Date.now!
			m \p @textInputVal
			m Icon,
				"fad:gamepad"
			m Button,
				"Nút bấm"
			m Button,
				color: \blue
				"Lam"
			m Button,
				color: \red
				"Đỏ"
			m Button,
				icon: \sim-card
			m Button,
				icon: \redo
				onclick: !~>
				"Làm mới"
			m InputGroup,
				m Button,
					color: \red
					"A"
				m TextInput,
					defaultValue: @textInputVal
				m Button,
					"B"
			m TextInput,
				icon: \lock
				value: @textInputVal
				onchange: (event) !~>
					@textInputVal = event.target.value
			m PasswordInput,
				defaultValue: "pokemon"
			m Checkbox,
				defaultChecked: yes
			m Checkbox,
				checked: @checkboxChecked
				onchange: (event) !~>
					@checkboxChecked = event.target.checked
				"Check"
			m Radio,
				"Radio"
			m Menu,
				items: @menuItems

m.mount document.body, App
